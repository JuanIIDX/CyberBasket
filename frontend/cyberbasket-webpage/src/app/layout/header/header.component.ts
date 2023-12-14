import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeUser: UserModel = new UserModel();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    const storedUserString = sessionStorage.getItem("user")

    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString)

      this.activeUser = new UserModel();
      this.activeUser.id = storedUser.id
      this.activeUser.email = storedUser.email
      this.activeUser.name = storedUser.name
      this.activeUser.last_name = storedUser.last_name
      this.activeUser.role_id = storedUser.role_id
    }

    this.document.body.classList.toggle('toggle-sidebar');
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }



  logout() {
    sessionStorage.removeItem("user");
    console.log("texto");
    console.log(sessionStorage);
    window.location.href = "/";
  }

}
