export interface CreateAppointmentsRequestBody {
    user_id: number;
    artist_id: number;
    date: Date;
    time: string;
}
export interface CreateUserRequestBody {
    name: string;
    last_name: string;
    address: string;
    email: string;  
    password: string;   
    phone_number: number;
 }

 export interface CreateArtistRequestBody {
   user_id: string;
   portfolio: string;
}

 export interface LoginUserRequestBody {
    email: string;
    password: string;
 }
 
 export interface TokenData {
    userId: string;
    userRoles: string;
 }