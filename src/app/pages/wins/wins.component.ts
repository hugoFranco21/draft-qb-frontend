import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wins',
  templateUrl: './wins.component.html',
  styleUrls: ['./wins.component.css']
})
export class WinsComponent implements OnInit{
  public winsForm: FormGroup = new FormGroup({});
  public rating!: number;
  public offplay!: number;
  public offyard!: number;
  public defplay!: number;
  public defyard!: number;
  public turnover!: number;
  public prediction: number = 0;
  public predictionErrors: string | undefined = undefined;
  public error:boolean = false;
  public isValid:boolean = true;

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
    this.winsForm = this.formBuilder.group({
      rating: new FormControl(this.rating, [
        Validators.required,
        Validators.min(0),
        Validators.max(158.3)
      ]),
      offplay: new FormControl(this.offplay, [
        Validators.required,
        Validators.min(0),
        Validators.max(3000),
      ]),
      offyard: new FormControl(this.offyard, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      defplay: new FormControl(this.defplay, [
        Validators.required,
        Validators.min(0),
        Validators.max(3000),
      ]),
      defyard: new FormControl(this.defyard, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      turnover: new FormControl(this.turnover, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    })
  }

  public async sendFormData() {
    this.winsForm.markAllAsTouched();
    if(this.winsForm.valid){
      this.isValid = true;
      await axios({
        method: 'post',
        url: environment.BACKEND_URL + '/wins-expected',
        data: {
          rating: this.rating,
          offplay: this.offplay,
          offyard: this.offyard,
          defplay: this.defplay,
          defyard: this.defyard,
          turnover: this.turnover,
        }
      }).then((response)=>{
        if(response?.data?.success === true){
          const prev = response.data.prediction.toFixed(2);
          this.prediction = prev < 16 ? prev : 16;
          this.predictionErrors = undefined;
          this.error = false;
        } else {
          console.log(response);
          this.prediction = 0;
          this.error = true;
          this.predictionErrors = "The input data could not produce a prediction, please check the input."
        }
      })
    } else {
      this.isValid = false;
    }
  }

}
