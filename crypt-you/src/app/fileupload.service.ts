import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { writeFile } from 'fs';
@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http:HttpClient) { }
  uploadFile(file,FOLDER) {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: 'AKIASPUSMNKQNTJSGYU4',
              secretAccessKey: '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',
              region: 'ap-south-1'
          }
      );
      const params = {
          Bucket: 'angular-node-bucket',
          Key: FOLDER + file.name,
          Body: file
      };
      bucket.upload(params, function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      })
    }
    downloadFile(file,FOLDER)
    {
        const bucket = new S3(
            {
                accessKeyId: 'AKIASPUSMNKQNTJSGYU4',
                secretAccessKey: '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',
                region: 'ap-south-1'
            }
        );
        const params = {
            Bucket: 'angular-node-bucket',
            Key: FOLDER + file
        };
        // bucket.getObject(params,(err,data)=>{
        //     if(err)
        //     {
        //         return console.log('Error downloading' + err)
        //     }
        //     console.log(JSON.stringify(data))
        //     var blob = new Blob([JSON.stringify(data.Body)],{type:data.ContentType})
        //     var url = window.URL.createObjectURL(blob)
        //     window.open(url)
        // })
        bucket.getSignedUrl('getObject',params,(err,data)=>{
            if(err)
            {
                return console.log(err)
            }
            console.log(data)
            window.open(data)
        })
    }
dumptoNode(file)
{
    return this.http.post("http://localhost:2000/fileupload",{'name':file},{withCredentials:true})
}
listFilesForUser()
{
    return this.http.get("http://localhost:2000/filelist",{withCredentials:true})
}
}