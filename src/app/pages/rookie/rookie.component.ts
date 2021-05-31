import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rookie',
  templateUrl: './rookie.component.html',
  styleUrls: ['./rookie.component.css']
})
export class RookieComponent implements OnInit {
  public rookieForm: FormGroup = new FormGroup({});
  public draft!: number;
  public sack!: number;
  public completion!: number;
  public yards!: number;
  public efficiency!: number;
  public prediction!: number;
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
    this.rookieForm = this.formBuilder.group({
      draft: new FormControl(this.draft, [
        Validators.required,
        Validators.min(1),
        Validators.max(7)
      ]),
      sack: new FormControl(this.sack, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      completion: new FormControl(this.completion, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      yards: new FormControl(this.yards, [
        Validators.required,
        Validators.min(0),
      ]),
      efficiency: new FormControl(this.efficiency, [
        Validators.required,
        Validators.min(0),
      ])
    })
  }

  public async sendFormData() {
    this.rookieForm.markAllAsTouched();
    if(this.rookieForm.valid){
      await axios({
        method: 'post',
        url: environment.BACKEND_URL + '/rookie-production',
        data: {
          draft: this.draft,
          sack: this.sack,
          completion: this.completion,
          yards: this.yards,
          efficiency: this.efficiency
        }
      }).then((response)=>{
        if(response?.data?.success){
          this.prediction = response.data.prediction;
          this.predictionErrors = undefined;
        } else {
          this.prediction = 0;
          this.predictionErrors = "The input data could not produce a prediction, please check the input"
        }
      })
    }
  }

}
