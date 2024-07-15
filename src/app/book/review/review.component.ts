import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Review } from '../models/review';
import { Observable } from 'rxjs';
import { ReviewService } from '../services/review.service';
import { User } from 'src/app/auth/model/user';
import { ReviewRequestBody } from '../models/reviewRequestBody';
import { NgForm, FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css'],
    standalone: true,
    imports: [FormsModule, AsyncPipe],
})
export class ReviewComponent implements OnInit {
  @Input('bookId') bookId: number;
  @Input('activeUser') activeUser: User;
  @Input('reviewsLength') reviewsLength: number;
  @Output() reviewListChanged: EventEmitter<void> = new EventEmitter();
  @ViewChild('addReviewForm', { static: false }) addReviewForm: NgForm;
  listReview$: Observable<Review[]>;
  rating: number = 5;
  constructor(private reviewService: ReviewService) {}

  loadReviews() {
    this.listReview$ = this.reviewService.getBookReviews(this.bookId);
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  submitReview(formValue: { body: string; rating: number }) {
    const review: ReviewRequestBody = {
      body: formValue.body,
      rating: +formValue.rating,
      username: this.activeUser.username,
      bookId: this.bookId,
    };
    this.reviewService.addBookReview(review).subscribe(() => {
      this.reviewListChanged.emit();
      this.addReviewForm.reset();
      this.loadReviews();
    });
  }

  deleteReview(id: number) {
    this.reviewService.deleteBookReview(id).subscribe(() => {
      this.loadReviews();
      this.reviewListChanged.emit();
    });
  }
}
