#include<stdio.h>
#include<io.h>
#include<Windows.h>
#include<string.h>
 
 
#define ADDR1 "photos//tea_bot//*.jpg" 
#define ADDR2 "photos//west_bot//*.jpg"

 
#define ADDR1_TO "photos//summary//1_tea.xml"
#define ADDR2_TO "photos//summary//2_west.xml" 

 
 
 
long Handle;
struct _finddata_t FileInfo;
 
//param��SreachAddr����·��,	fopenAddrд���ļ� ,albumName����� 
 
int loadPhotos(const char * SreachAddr,char* fopenAddr,char* albumName){
	int count = 0;//��Ƭ���� 
	//ָ��д���ļ� xml
	FILE *fp=fopen(fopenAddr,"w");
	if(fp==NULL)//û��д���ļ� 
  		{
  			printf("please confirm the written file address");
	 		return 0;
 		}
 	
	 //xml�ļ���ʽ��ͷ 
	fprintf(fp,"%s","<?xml version=\"1.0\" encoding=\"UTF-8\" ?> \n<");
	fprintf(fp,"%s>\n",albumName);		
	
	//ָ����ѯ·��  
	Handle=_findfirst(SreachAddr,&FileInfo); 
	printf("%s%s%s\n","loading album -",albumName,"- now..."); 
	printf("%s\n","---------<<<<<<<---------");
	
	
	
	//�ļ��������ļ� 
	if(-1==Handle){
		printf("         Empty\n");
		printf("--------->>>>>>>---------\n");
		printf("-->>total: %d photos\n",count);
		printf("-->>load -%s- successfully\n\n\n",albumName);
		fprintf(fp,"</%s>",albumName);//xml�ļ���ʽ��β
		fclose(fp);
		_findclose(Handle);
		return -1;
	}
	
	//������ļ����ļ���д��xml�ļ���		
	do{
		count++; 
		printf("%s\n",FileInfo.name);
		
 		fprintf(fp,"%s","<photo>"); 
 		fprintf(fp,"%s</photo>\n",FileInfo.name);	
	} 
	while(!_findnext(Handle,&FileInfo));//ָ��������һ�� 
		fprintf(fp,"</%s>",albumName);//xml�ļ���ʽ��β
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

		printf("++++++++++++++++++++++++++++++++++++\n");
		printf("====================================\n");
		printf("-->>load all album successfully!\n\n");					
		system("pause");
		return 0;
} 
