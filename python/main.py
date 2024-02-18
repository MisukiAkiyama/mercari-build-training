import os
import logging
import pathlib
from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
logger = logging.getLogger("uvicorn")
logger.level = logging.INFO
images = pathlib.Path(__file__).parent.resolve() / "images"
items_file = pathlib.Path(__file__).parent.resolve() / "items.json"
origins = [os.environ.get("FRONT_URL", "http://localhost:3000")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello, world!"}


@app.post("/items")
def add_item(name: str = Form(...),category: str = Form(...)):
    logger.info(f"Receive item: {name}")
    logger.info(f"Receive item: {category}")
    return {"message": f"item received: {name}"}
    save_items_to_file(name,category)

# {"items": [{"name": "jacket", "category": "fashion"}, ...]}
def save_items_to_file(name,category):
    if os.path.exists(items_file):
        new_item = {"name": {name}, "category": {category}}
        with open(items_file, 'w') as f:
            now_data = json.load(file)
            now_data["items"].append(new_item)
            json.dump(now_data, f, indent=2)
    else:
        first_item = {"items": [{"name": {name}, "category": {category}}]}
        with open(items_file, 'w') as f:
            json.dump(first_item, f, indent=2)


@app.get("/image/{image_name}")
async def get_image(image_name):
    # Create image path
    image = images / image_name

    if not image_name.endswith(".jpg"):
        raise HTTPException(status_code=400, detail="Image path does not end with .jpg")

    if not image.exists():
        logger.debug(f"Image not found: {image}")
        image = images / "default.jpg"

    return FileResponse(image)
