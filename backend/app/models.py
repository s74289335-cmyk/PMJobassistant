from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


# 🔹 USER MODEL
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    resume = Column(Text, nullable=True)

    # 🔥 Relationship
    applications = relationship("Application", back_populates="user")


# 🔹 APPLICATION MODEL
class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)
    job_title = Column(String)
    company = Column(String)
    status = Column(String, default="Applied")

    # 🔥 IMPORTANT
    user_id = Column(Integer, ForeignKey("users.id"))

    # 🔥 Relationship
    user = relationship("User", back_populates="applications")