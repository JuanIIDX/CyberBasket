import { Component, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  
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

}
