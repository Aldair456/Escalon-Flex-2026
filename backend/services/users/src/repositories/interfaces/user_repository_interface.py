from abc import ABC, abstractmethod
from typing import List, Optional

from src.models.user import User


class UserRepositoryInterface(ABC):
    @abstractmethod
    def get_all(self) -> List[User]:
        ...

    @abstractmethod
    def get_by_id(self, user_id: str) -> Optional[User]:
        ...

    @abstractmethod
    def create(self, user: User) -> User:
        ...
