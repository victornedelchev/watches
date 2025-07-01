import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';

import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { IWatch } from 'src/app/core/interfaces/watch';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-edit-watch',
  templateUrl: './edit-watch.component.html',
  styleUrls: ['./edit-watch.component.css']
})
export class EditWatchComponent implements OnInit {
  @ViewChild('editWatchForm') editWatchForm!: NgForm;

  faExclamationTriangle = faExclamationTriangle;
  errorMessage: string = '';

  constructor(private titleService: Title,
    private watchService: WatchService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Edit Watch Page');

    const watchId = this.activatedRoute.snapshot.params['_id'];

    this.watchService.loadWatchById$(watchId).subscribe((watch: IWatch) => {
      this.editWatchForm.form.patchValue({
        brand: watch.brand,
        model: watch.model,
        price: watch.price,
        imageUrl: watch.imageUrl,
        summary: watch.summary
      });
    })
  }

  editWatch(editWatchForm: NgForm) {
    this.errorMessage = '';
    const watchId = this.activatedRoute.snapshot.params['_id'];

    this.watchService.editWatchById$(watchId, editWatchForm.value).subscribe({
      next: () => {
        editWatchForm.reset();
        this.router.navigate([`/watches/${watchId}`])
      }
    })
  }
}
