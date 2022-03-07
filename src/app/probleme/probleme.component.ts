import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators , FormGroup } from '@angular/forms';


@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  
  problemeForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  this.problemeForm = this.fb.group({

    prenom: ['',[Validators.minLength(2)]]

    });
  }

}
