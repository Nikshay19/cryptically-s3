import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import {UserProfileServiceService} from '../user-profile-service.service'
import {FileuploadService} from '../fileupload.service'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public href: string
  public status: string
  public selectedFiles: FileList
  public foldername: String
  public listfiles:String[]=[]
  constructor(private router:Router,private up:UserProfileServiceService,private route:ActivatedRoute,private cookieService: CookieService,private fileupload:FileuploadService) { }

  ngOnInit() {
    this.callURIExportFunction(this.router.url)
      this.checkUserSession()
      this.getFile()
  }
callURIExportFunction(uri)
{
  if(this.route.snapshot.queryParamMap.get('code'))
  {
    this.up.exportURI(uri).subscribe((response)=>{
      console.log('here here' + JSON.stringify(response))
      if(response[0].status==='redir')
      {
        this.status='checked'
        console.log(this.status)
        this.cookieService.set('cookie',response[0].cookie.userid);
        return this.router.navigate(['UserProfile'],{queryParams:{'user':response[0].user,'status':'checked'}})
      }
    },(err)=>{
      console.log('Error' +err)
    })
  }  

}
checkUserSession()
{
  console.log(this.route.snapshot.queryParamMap.get('status'))
  // if(this.status==='checked')
  // {
  //   return console.log('checked')
  // }
if(this.route.snapshot.queryParamMap.get('status'))
  {
    return console.log('ok');
  }
this.up.verifyUser().subscribe((response)=>{
  console.log(JSON.stringify(response))
if(response[0].user)
{
  console.log(response +'51')
  this.foldername=response[0].user
  this.cookieService.set('cookie',response[0].cookie);
 return this.router.navigate(['UserProfile'],{queryParams:{'user':response[0].user}})
}
else if(response[0].status==='noway')
{
  alert('You have to login!')
  return this.router.navigate(['/'])
}
else
{
  console.log('Something else is screwed up')
}
},(error)=>{
console.log('Error ' +JSON.stringify(error))
})
}
upload() {
  const file = this.selectedFiles.item(0);
  this.fileupload.dumptoNode(file.name).subscribe((res)=>{
    console.log(res)
  },(err)=>{
    console.log(err)
  })
  this.fileupload.uploadFile(file,this.foldername+'/');
  }
  
  selectFile(event) {
  this.selectedFiles = event.target.files;
  }
  getFile()
  {
console.log('90')
  this.fileupload.listFilesForUser().subscribe((res)=>{
    console.log('executed')
    for(var item in res)
    {
      var temp = res[item]
      this.listfiles.push(temp)
    }
  },(err)=>{
    console.log(err)
  })
  }
  download(name)
  {
    this.fileupload.downloadFile(name,this.foldername+'/')
  }
}

