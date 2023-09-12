import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
users!:User[];
  constructor(private userService:UserService){}


  ngOnInit(): void {
   this.userService.GetUsers().subscribe(res=>{
    this.users = res;
   });
  }
  deleteUser(id:any){
    if(confirm('Are you sure to delete?')) {
      this.userService.DeleteUser(id).subscribe(res => {
        if(res.status==200) {
          for(let i=0; i<this.users.length;i++){
            if(id===this.users[i]._id){
              this.users.splice(i, 1);
              break;
            }
          }
        }
      });
    }
  }
}
