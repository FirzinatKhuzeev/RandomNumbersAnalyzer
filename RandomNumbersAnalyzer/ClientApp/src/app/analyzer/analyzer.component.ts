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
      frequencyMonobit: 1000000,
      frequencyMonobitCheck: true,
      frequencyTestWithinBlock: 1000000,
      frequencyTestWithinBlockCheck: true,
      frequencyTestWithinBlockM: 128,
      runs: 1000000,
      runsCheck: true,
      longestRunOfOnesInBlock: 1000000,
      longestRunOfOnesInBlockCheck: true,
      binaryMatrixRank: 1000000,
      binaryMatrixRankCheck: false,
      discreteFourierTransform: 1000000,
      discreteFourierTransformCheck: false,
      nonOverlappingTemplateMatching: 1000000,
      nonOverlappingTemplateMatchingCheck: false,
      nonOverlappingTemplateMatchingSingle: false,
      nonOverlappingTemplateMatchingB: 111111111,
      nonOverlappingTemplateMatchingM: 9,
      overlappingTemplateMatching: 1000000,
      overlappingTemplateMatchingCheck: false,
      overlappingTemplateMatchingB: 111111111,
      universal: 1000000,
      universalCheck: false,
      universalCustom: false,
      universalL: 1000000,
      universalQ: 1000000,
      linearComplexity: 1000000,
      linearComplexityCheck: true,
      linearComplexityM: 500,
      serial: 1000000,
      serialCheck: false,
      serialM: 16,
      approximateEntropy: 1000000,
      approximateEntropyCheck: true,
      approximateEntropyM: 10,
      cumulativeSums: 1000000,
      cumulativeSumsCheck: false,
      cumulativeSumsForward: true,
      randomExcursions: 1000000,
      randomExcursionsCheck: false,
      randomExcursionsVariant: 1000000,
      randomExcursionsVariantCheck: 1000000,
      splitCharacter: "/",
      numbers: "test"
    }) as any);
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
