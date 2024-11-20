from subprocess import CompletedProcess

from fastapi import FastAPI
import subprocess as sp
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
    return {"Hello": "World"}

@app.get("/scan/alive")
async def scan_alive(host: str, flag: str = "-sP"):
    result= sp.run(["nmap", flag, host], capture_output=True, text=True).stdout
    result = result.split("\n")[-2].split(" ")[5]
    result = result.replace("(", "")
    return result

@app.get("/scan/device")
async def scan_device(host: str):
    result = sp.run(["nmap", "--osscan-gues", host], capture_output=True, text=True).stdout
    print(result)
    if len(result.lower().split("iphone-sync")) >= 2:
        return "IPhone"
    elif (len(result.lower().split("microsoft")) >= 2) or (len(result.split("msrpc")) >= 2):
        return "Windows"
    elif len(result.lower().split("android")) >= 2:
        return "Android"
    elif len(result.lower().split("linux")) >= 2:
        return "Linux"
    if len(result.lower().split("apple")) >= 2:
        return "Unknown Apple device"
    else:
        return "Unknown"