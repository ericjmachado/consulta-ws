import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss']
})
export class DetailsCardComponent implements OnInit {

  private details: any = '';
  private geocoder: any;

  constructor(private route: ActivatedRoute, private router: Router, private mapsApiLoader: MapsAPILoader) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (JSON.parse(params.get('obj'))) {
          this.details = JSON.parse(params.get('obj'));
          if (!this.details) {
            this.kickUser();
          } else {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': this.details.logradouro }, function (results, status) {
              if (status) {
                console.log(results);
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
          }
        } else {
          this.kickUser();
        }
      }
    );
  }

  private kickUser() {
    Swal.fire('Ooops!', 'Algo deu errado tente novamente!', 'warning');
    this.router.navigate(['/']);
  }
}
