import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styles: [`

  .texto{
    text-align:center;
    
  }

  h2 ,p ,span{
    line-height: 1;
  }
    
    h2{
      font-size:100px;
      font-weight:900;
      color:#b0e0ce;
    }

    p{
      font-size:30px;
      font-weight:400;
      line-height: 0;
    }
    span{
      font-size:200px;
      font-weight:900;
    }
    img{
      width:50%;
    }
    
    h1{
    font-size: 35px;
    color: #b0e0ce;
     }
     a{
       display:flex;
     }
   .logo{
     font-size: 20px;
  }
  `
  ]
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
