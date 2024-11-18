from fastapi import FastAPI
import subprocess as sp
app = FastAPI()

@app.get("/")
async def root():
    return {"Hello": "World"}

@app.get("/scan")
async def scan(host: str, flag: str = "-sP"):
    result = sp.run(["nmap", flag, host], capture_output=True, text=True)
    return result.stdout
