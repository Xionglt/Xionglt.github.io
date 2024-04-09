#include<stdio.h>
#include<io.h>
#include<Windows.h>
#include<string.h>
 
 
#define ADDR1 "photos//tea_bot//*.jpg" 
#define ADDR2 "photos//west_bot//*.jpg"
#define ADDR3 "photos//shop//*.jpg"
#define ADDR4 "photos//story//*.jpg"
 
#define ADDR1_TO "photos//summary//1_tea.xml"
#define ADDR2_TO "photos//summary//2_west.xml" 
#define ADDR3_TO "photos//summary//3_shop.xml" 
#define ADDR4_TO "photos//summary//4_story.xml" 
 
 
long Handle;
struct _finddata_t FileInfo;
 
//param：SreachAddr查找路径,	fopenAddr写入文件 ,albumName相册名 
 
int loadPhotos(const char * SreachAddr,char* fopenAddr,char* albumName){
	int count = 0;//照片计数 
	//指定写入文件 xml
	FILE *fp=fopen(fopenAddr,"w");
	if(fp==NULL)//没有写入文件 
  		{
  			printf("please confirm the written file address");
	 		return 0;
 		}
 	
	 //xml文件格式开头 
	fprintf(fp,"%s","<?xml version=\"1.0\" encoding=\"UTF-8\" ?> \n<");
	fprintf(fp,"%s>\n",albumName);		
	
	//指定查询路径  
	Handle=_findfirst(SreachAddr,&FileInfo); 
	printf("%s%s%s\n","loading album -",albumName,"- now..."); 
	printf("%s\n","---------<<<<<<<---------");
	
	
	
	//文件夹下无文件 
	if(-1==Handle){
		printf("         Empty\n");
		printf("--------->>>>>>>---------\n");
		printf("-->>total: %d photos\n",count);
		printf("-->>load -%s- successfully\n\n\n",albumName);
		fprintf(fp,"</%s>",albumName);//xml文件格式结尾
		fclose(fp);
		_findclose(Handle);
		return -1;
	}
	
	//如果有文件则将文件名写入xml文件中		
	do{
		count++; 
		printf("%s\n",FileInfo.name);
		
 		fprintf(fp,"%s","<photo>"); 
 		fprintf(fp,"%s</photo>\n",FileInfo.name);	
	} 
	while(!_findnext(Handle,&FileInfo));//指针移向下一个 
		fprintf(fp,"</%s>",albumName);//xml文件格式结尾
		printf("--------->>>>>>>---------\n");
		printf("-->>total: %d photos\n",count);
		printf("-->>load -%s- successfully\n\n\n",albumName); 
		
		fclose(fp);
		_findclose(Handle);
}
 
int main(void)
{		
		printf("start loading photos,please wait for seconds...\n\n");
		loadPhotos(ADDR1,ADDR1_TO,"tea_bot");	
		loadPhotos(ADDR2,ADDR2_TO,"west_bot");	
		loadPhotos(ADDR3,ADDR3_TO,"shop");
		loadPhotos(ADDR4,ADDR4_TO,"story");
		printf("++++++++++++++++++++++++++++++++++++\n");
		printf("====================================\n");
		printf("-->>load all album successfully!\n\n");					
		system("pause");
		return 0;
} 
