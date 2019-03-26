import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent implements OnInit {
  public report: Report;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    this.report = (({
    frequencyMonobit: 1,
    frequencyMonobitCheck: false,
    frequencyTestWithinBlock: 1,
    frequencyTestWithinBlockCheck: false,
    frequencyTestWithinBlockM: 1,
    runs: 1,
    runsCheck: false,
    longestRunOfOnesInBlock: 1,
    longestRunOfOnesInBlockCheck: false,
    binaryMatrixRank: 1,
    binaryMatrixRankCheck: false,
    discreteFourierTransform: 1,
    discreteFourierTransformCheck: false,
    nonOverlappingTemplateMatching: 2,
    nonOverlappingTemplateMatchingCheck: false,
    nonOverlappingTemplateMatchingSingle: false,
    nonOverlappingTemplateMatchingB: 1,
    nonOverlappingTemplateMatchingM: 2,
    overlappingTemplateMatching: 1,
    overlappingTemplateMatchingCheck: false,
    overlappingTemplateMatchingB: 2,
    universal: 2,
    universalCheck: false,
    universalCustom: false,
    universalL: 1,
    universalQ: 2,
    linearComplexity: 2,
    linearComplexityCheck: 1,
    linearComplexityM: 2,
    serial: 1,
    serialCheck: false,
    serialM: 1,
    approximateEntropy: 1,
    approximateEntropyCheck: 1,
    approximateEntropyM: 1,
    cumulativeSums: 1,
    cumulativeSumsCheck: false,
    cumulativeSumsForward: false,
    randomExcursions: 1,
    randomExcursionsCheck: false,
    randomExcursionsVariant: 2,
    randomExcursionsVariantCheck: 2,
    splitCharacter: "/",
    numbers: "test"}) as any);
  }

  ngOnInit() {
  }

  runTests() {
    this.http.post(this.baseUrl + 'api/analyzer', this.report)
      .subscribe(
        (data: { [id: string]: Report; }) => {
          console.log(data);
        },
        error => console.error(error));
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    }
  }
}

interface Report {
  frequencyMonobit: number;
  frequencyMonobitCheck: false;
  frequencyTestWithinBlock: number;
  frequencyTestWithinBlockCheck: false;
  frequencyTestWithinBlockM: number;
  runs: number;
  runsCheck: false;
  longestRunOfOnesInBlock: number;
  longestRunOfOnesInBlockCheck: false;
  binaryMatrixRank: number;
  binaryMatrixRankCheck: false;
  discreteFourierTransform: number;
  discreteFourierTransformCheck: false;
  nonOverlappingTemplateMatching: number;
  nonOverlappingTemplateMatchingCheck: false;
  nonOverlappingTemplateMatchingSingle: false;
  nonOverlappingTemplateMatchingB: number;
  nonOverlappingTemplateMatchingM: number;
  overlappingTemplateMatching: number;
  overlappingTemplateMatchingCheck: false;
  overlappingTemplateMatchingB: number;
  universal: number;
  universalCheck: false;
  universalCustom: false;
  universalL: number;
  universalQ: number;
  linearComplexity: number;
  linearComplexityCheck: false;
  linearComplexityM: number;
  serial: number;
  serialCheck: false;
  serialM: number;
  approximateEntropy: number;
  approximateEntropyCheck: number;
  approximateEntropyM: number;
  cumulativeSums: number;
  cumulativeSumsCheck: false;
  cumulativeSumsForward: false;
  randomExcursions: number;
  randomExcursionsCheck: false;
  randomExcursionsVariant: number;
  randomExcursionsVariantCheck: number;
  splitCharacter: string;
  numbers: string;
}
