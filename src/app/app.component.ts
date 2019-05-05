import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as fromat from 'dateformat';
import * as Dropzone from 'dropzone';
import {FileUploader} from 'ng2-file-upload';
import * as $ from 'jquery';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Tour Of Heroes';

    @ViewChild('file') file: ElementRef;

    public downloadUrl = 'http://localhost:8090/crop/download/';
    public fileName = '';
    public format = 'dd-MM-yyyy HH:mm:ss';
    @ViewChild('dropzoneForm') dropzoneForm: ElementRef;

    dz: Dropzone;

    upName = '请选择要上传的文件~';
    fileUpload: FileUploader = new FileUploader({
        url: 'http://localhost:8090/crop/uploadFile',
        method: 'POST',
        itemAlias: 'file'
    });

    videoUrl = '../assets/20150818193054.wmv';

    ngOnInit() {
        this.initDropzone();
    }

    constructor() {
    }

    async initDropzone() {
        const self = this;
        this.dz = new Dropzone(this.dropzoneForm.nativeElement,
            {
               url: '11111',
               init: function () {
               }
            });

    }

    downloadFile(url, name) {

    }

    getBlob(url) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                }
            };
            xhr.send();
        });
    }

    // 上传文件改变事件
    onChange(event) {
        const file = event.target.files[0];
        this.upName = file.name;
    }

    // 文件上传点击事件
    upFile() {
        const files = this.file.nativeElement.files;
        this.fileUpload.queue[0].onSuccess = function(response, status, headers) {
            if (status === 200) {
                console.log('上传成功!');
            }
        };
        this.fileUpload.queue[0].upload();
    }

    // 选择文件弹窗
    chooseFile() {
        this.file.nativeElement.click();
    }

}
