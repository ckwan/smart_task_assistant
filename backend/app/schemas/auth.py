from pydantic import BaseModel, ConfigDict

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

    # Pydantic v2 replacement for orm_mode
    model_config = ConfigDict(from_attributes=True)
