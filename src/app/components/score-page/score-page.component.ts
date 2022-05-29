import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/models/score';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.less']
})
export class ScorePageComponent implements OnInit {

  scores: Array<Score>;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreService.getBestScores(20).subscribe((scores: Array<Score>) => {
      this.scores = scores;
    })
  }

}
