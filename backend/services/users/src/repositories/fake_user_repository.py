from typing import List, Optional

from src.models.user import User
from src.repositories.interfaces.user_repository_interface import UserRepositoryInterface


class FakeUserRepository(UserRepositoryInterface):
    def __init__(self):
        self._users = [
            User(id="1", name="Jefferson Castañeda", email="jefferson@example.com"),
            User(id="2", name="Ana Torres", email="ana@example.com"),
        ]

    def get_all(self) -> List[User]:
        return self._users

    def get_by_id(self, user_id: str) -> Optional[User]:
        return next((u for u in self._users if u.id == user_id), None)

    def create(self, user: User) -> User:
        self._users.append(user)
        return user
