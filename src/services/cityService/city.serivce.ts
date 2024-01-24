import { PrismaClient } from "@prisma/client";

class CityService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getCity = async () => {
        try {
            const allCity = await this.prisma.city.findMany();
            console.log('result', allCity);
            return allCity;
        } catch (error) {
            console.error(error);
            throw error; 
        } finally {
            
            await this.prisma.$disconnect();
        }
    }
}

export const cityService = new CityService();
