import axios from 'axios';
import User from '../models/user/user';
import UserRepository from '../models/user/user-repository';

interface UserCapabilities {
  id: string;
  capabilities: string[];
}

export default class UsersRemoteRepository implements UserRepository {
  constructor(private baseUrl = 'http://localhost:3000/') {
    console.log(`User API Set to ${baseUrl}`);
  }

  getAll = async () => {
    const usersResponse = await axios.get<User[]>(`${this.baseUrl}users`);
    const capabilitiesResponse = await axios.get<UserCapabilities[]>(`${this.baseUrl}capabilities`);
    const users = UsersRemoteRepository.getUsersWithCapabilities(usersResponse.data, capabilitiesResponse.data);
    return users;
  };

  get = async (id: string) => {
    const userResponse = await axios.get<User>(`${this.baseUrl}users?id=${id}`);
    const capabilitiesResponse = await axios.get<UserCapabilities[]>(`${this.baseUrl}capabilities`);
    return UsersRemoteRepository.mergeUserWithCapabilities(userResponse.data, capabilitiesResponse.data);
  };

  add = async (newUser: User) => {
    const response = await axios.post<User>(`${this.baseUrl}users`, newUser);
    return response.data;
  };

  update = async (user: User) => {
    const response = await axios.put<User>(`${this.baseUrl}users/${user.id}`, user);
    return response.data;
  };

  delete = async (userId: string) => {
    await axios.delete(`${this.baseUrl}users/${userId}`);
    return 'OK';
  };

  private static getUsersWithCapabilities(users: User[], userCapabilities: UserCapabilities[]) {
    return users.map((user) => UsersRemoteRepository.mergeUserWithCapabilities(user, userCapabilities));
  }

  private static mergeUserWithCapabilities(user: User, userCapabilities: UserCapabilities[]) {
    const userResult = { ...user };
    const matched = userCapabilities.find((c) => c.id === user.id);
    userResult.capabilities = matched.capabilities;
    return userResult;
  }
}
