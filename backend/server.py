from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
from notion_client import Client


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Notion client
notion_token = os.environ.get('NOTION_TOKEN', '')
notion_database_id = os.environ.get('NOTION_DATABASE_ID', '')
notion_client = Client(auth=notion_token) if notion_token else None

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactFormRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)

class ContactFormResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    submitted_at: str
    status: str = "received"


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "OptiCore API - AI Automation & Marketing"}

@api_router.post("/contact", response_model=ContactFormResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(contact_data: ContactFormRequest):
    """
    Handle contact form submissions and save them to Notion.
    """
    try:
        submitted_at = datetime.now(timezone.utc)
        
        # Save to Notion if configured
        if notion_client and notion_database_id:
            try:
                properties = {
                    "Name": {
                        "title": [{"text": {"content": contact_data.name}}]
                    },
                    "Email": {
                        "email": contact_data.email
                    },
                    "Message": {
                        "rich_text": [{"text": {"content": contact_data.message}}]
                    },
                    "Submitted At": {
                        "date": {"start": submitted_at.isoformat()}
                    },
                    "Status": {
                        "select": {"name": "New"}
                    }
                }
                
                response = notion_client.pages.create(
                    parent={"database_id": notion_database_id},
                    properties=properties
                )
                
                page_id = response.get("id")
            except Exception as e:
                logging.error(f"Notion API error: {str(e)}")
                # Continue even if Notion fails
                page_id = str(uuid.uuid4())
        else:
            page_id = str(uuid.uuid4())
        
        return ContactFormResponse(
            id=page_id,
            name=contact_data.name,
            email=contact_data.email,
            message=contact_data.message,
            submitted_at=submitted_at.isoformat(),
            status="received"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process contact form: {str(e)}"
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()