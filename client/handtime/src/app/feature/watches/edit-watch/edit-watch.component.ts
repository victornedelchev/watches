import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { IWatch } from 'src/app/core/interfaces/watch';
import { UserService } from 'src/app/core/user.service';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-edit-watch',
  templateUrl: './edit-watch.component.html',
  styleUrls: ['./edit-watch.component.css']
})
export class EditWatchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editWatchForm') editWatchForm!: NgForm;

  faExclamationTriangle = faExclamationTriangle;
  errorMessage: string = '';
  isModalOpen: boolean = false;
  pendingEditData: any = null;
  selectedWatch: IWatch | null = null;
  formStatus: string = '';
  private intervalId: any;

  constructor(private titleService: Title,
    private watchService: WatchService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  get watchId(): string {
    return this.activatedRoute.snapshot.params['_id'];
  }

  ngOnInit(): void {
    this.titleService.setTitle('Edit Watch Page');

    this.watchService.loadWatchById$(this.watchId).subscribe({
      next: (watch: IWatch) => {
        this.editWatchForm.form.patchValue({
          brand: watch.brand,
          model: watch.model,
          price: watch.price,
          imageUrl: watch.imageUrl,
          summary: watch.summary
        });
      },
      error: (err) => {
        if (err.status === 403) {
          this.errorMessage = err.error.message || 'Error loading watch details';
          this.intervalId = setInterval(() => {
            this.userService.logout$().subscribe(() => {
              this.router.navigate(['/user/login']);
            });
          }, 2500);
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.editWatchForm.statusChanges?.subscribe((status) => {
      this.formStatus = status;
    });
  }

  editWatch(editWatchForm: NgForm): void {
    this.errorMessage = '';
    this.pendingEditData = { ...editWatchForm.value };
    this.selectedWatch = { ...editWatchForm.value };
    this.isModalOpen = true;
  }

  onModalSave() {
    this.watchService.editWatchById$(this.watchId, this.pendingEditData).subscribe({
      next: () => {
        this.isModalOpen = false;
        this.pendingEditData = null;
        this.selectedWatch = null;
        this.editWatchForm.reset();
        this.router.navigate([`/watches/${this.watchId}`])
      },
      error: (err) => {
        this.errorMessage = err;
        this.isModalOpen = false;
        this.pendingEditData = null;
        this.selectedWatch = null;
        console.error(err);
      }
    })
  }

  onModalClose() {
    this.isModalOpen = false;
    this.pendingEditData = null;
    this.selectedWatch = null;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
