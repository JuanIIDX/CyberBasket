import sys, os
from fastapi.staticfiles import StaticFiles
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from fastapi import FastAPI
from  routes.orders import router
app = FastAPI()
#app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(router, prefix="/orden")
@app.get("/", tags=["Main"])
def main():
    return {"message": "Hello cyberbasket"}


"""app = FastAPI()

# Configura la clave secreta de Stripe
stripe.api_key = os.environ.get("STRIPE_API_KEY")

@app.post("/webhook")
async def stripe_webhook(payload: Optional[dict] = None, sig_header: Optional[str] = None):
    # Verifica la firma del webhook
    endpoint_secret = "tu_secreto_de_webhook_de_stripe"
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        # Puedes realizar acciones específicas para este evento
        print("PaymentIntent was successful!")

    # Puedes manejar otros tipos de eventos de Stripe según tus necesidades

    return JSONResponse(content={'received': True})

# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="127.0.0.1", port=8000)"""
