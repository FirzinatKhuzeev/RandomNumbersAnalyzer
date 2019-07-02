import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent implements OnInit {
  public test: ITest;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    this.test = (({
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
      numbers: ""
    }) as any);
  }

  ngOnInit() {
  }

  runTests() {
    this.http.post(this.baseUrl + 'api/analyzer', this.test)
      .subscribe(
        data=> {
          console.log(data);
        },
        error => console.error(error));
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this.baseUrl + 'api/upload', formData)
      .subscribe(data => {
        this.test.numbers = (data as any).path;
        console.log(data);
      });
  }
}

interface ITest {
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

interface IReport {
  title: string;
  body: string;
}
