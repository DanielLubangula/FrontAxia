import { Injectable } from '@angular/core';
import { InfoUser } from '../models/info-user';

@Injectable({
  providedIn: 'root'
})
export class InfoUserService {

  async getUserInfo(token: string): Promise<InfoUser> {
    const response = await fetch('http://localhost:5000/api/user/getuser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }

    return await response.json();
  }
  async getAlluser(token: string) {
    const response = await fetch('http://localhost:5000/api/user/alluser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }

    return await response.json();
  }
  constructor() { }
}
