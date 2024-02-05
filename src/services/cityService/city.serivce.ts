import { PrismaClient } from "@prisma/client";

class CityService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getCity = async () => {
        try {
            const allCity = await this.prisma.city.findMany();
            return allCity;
        } catch (error) {
            console.error(error);
            throw error; 
        } finally {
            
            await this.prisma.$disconnect();
        }
    }
    createNewCity= async (cityData: {
        cityName: string;
        country: string;
        status: boolean;
        
       
    })=>{
        try{
            console.log("city",cityData.cityName)
           
             
            const existCity =await this.prisma.city.findFirst({
                where:{
                    cityName: cityData.cityName
                }
            })
            if(existCity){
                return  {
                    status :'Error',
                    message:'City already Exist',
                    data:'null'
                }
            }
            
            const newCity =await this.prisma.city.create({
                data:{
                cityName: cityData?.cityName,
                country :cityData?.country,
                status: cityData?.status,
                createAt: new Date()
                
               
                  }
                


            })
            return {
               
                status :'Success',
                message:'Create new city success !',
                data: newCity
            }


        }catch(error){
            console.log(error)
        }
    }
    getCurrentCity =async (cityId:number)=>{
        try{
            
            const currentCity =await this.prisma.city.findUnique({
                where:{
                    id :cityId
                }
            })
            return currentCity

        }catch(error){
            console.log(error)
        }
    

    }
    editCity = async (currentData: {
        id: number;
        cityName: string;
        country: string;
        status: boolean;
       
   
      }) => {
        try {
          await this.prisma.city.update({
            where: {
              id: currentData.id
            },
            data: {
              cityName: currentData.cityName,
              country: currentData.country,
              status: currentData.status,
             
            }
          });
      
          return {
            status: 'Success',
            message: 'Update successfully!',
          };
        } catch (error) {
          console.log(error);
          throw new Error('Failed to update city');
        }
      }
      deleteCity =async(cityId:number)=>{
        try{
            await this.prisma.city.delete({
                where:{
                    id: cityId
                }
            })
            return {
                status: 'Success',
                message: 'Update successfully!',
              };
         
        }catch(error){
            console.log(error)
        }

      }
}

export const cityService = new CityService();
