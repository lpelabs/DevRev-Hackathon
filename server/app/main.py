
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

#####
# API routers
#####
from api import endpoints


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Server is running!"}

# Include your API routers here
app.include_router(endpoints.router, prefix="", tags=["Home"])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)