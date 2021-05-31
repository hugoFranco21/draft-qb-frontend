import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wins',
  templateUrl: './wins.component.html',
  styleUrls: ['./wins.component.css']
})
export class WinsComponent {
  public winsForm: FormGroup = new FormGroup({});
  public rating: number = 0;
  public offplay: number = 0;
  public offyard: number = 0;
  public defplay: number = 0;
  public defyard: number = 0;
  public turnover: number = 0;
  public prediction: number = 0;
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
    await axios({
      method: 'post',
      url: environment.BACKEND_URL + '/rookie-production',
      data: {
        rating: this.rating,
        offplay: this.offplay,
        offyard: this.offyard,
        defplay: this.defplay,
        defyard: this.defyard,
        turnover: this.turnover,
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
