import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  public draftForm: FormGroup = new FormGroup({});
  public wins!: number;
  public completion!: number;
  public yards!: number;
  public tds!: number;
  public ints!: number;
  public rating!: number;
  public years!: number;
  public age!: number;
  public prediction!: string;
  public predictionErrors: string | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  /**
   * @description Initializes the form with the corresponding fields and validators
   */
  private initializeForm() {
    this.draftForm = this.formBuilder.group({
      wins: new FormControl(this.wins, [
        Validators.required,
        Validators.min(0),
        Validators.max(16)
      ]),
      completion: new FormControl(this.completion, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      yards: new FormControl(this.yards, [
        Validators.required,
        Validators.min(0),
        Validators.max(10000),
      ]),
      tds: new FormControl(this.tds, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      ints: new FormControl(this.ints, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      rating: new FormControl(this.rating, [
        Validators.required,
        Validators.min(0),
        Validators.max(158.3),
      ]),
      years: new FormControl(this.years, [
        Validators.required,
        Validators.min(0),
        Validators.max(15),
      ]),
      age: new FormControl(this.age, [
        Validators.required,
        Validators.min(0),
        Validators.max(50),
      ]),
    })
  }

  public async sendFormData() {
    this.draftForm.markAllAsTouched();
    if(this.draftForm.valid){
      await axios({
        method: 'post',
        url: environment.BACKEND_URL + '/should-draft',
        data: {
          wins: this.wins,
          completion: this.completion,
          yards: this.yards,
          tds: this.tds,
          ints: this.ints,
          rating: this.rating,
          years: this.years,
          age: this.age,
        }
      }).then((response)=>{
        if(response?.data?.success){
          this.prediction = response.data.prediction;
          this.predictionErrors = undefined;
        } else {
          this.prediction = '';
          this.predictionErrors = "The input data could not produce a prediction, please check the input"
        }
      })
    }
  }
}
