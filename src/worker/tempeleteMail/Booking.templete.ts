export const checkOut = (data:any) => {
    const checkOutEmail = `
  <html>
  <head>
    <style>
      .table-1{
        align-items: center;
        width: 80%;
        background-color: aqua;
        margin-left:10%;
        border-radius: 10px;
        height: 3%;
  
      }
      .table-2{
        align-items: center;
        width: 80%;
        background-color: rgb(197, 145, 34);
        margin-left:10%;
        border-radius: 10px;
        height: 3%;
  
      }
      .header p{
        text-align: center;
  
      }
      .logoIcon {
       
          margin-top: 5px;
          gap: 5px;
          display: flex;
          flex-direction: row;
         
          
      }
      .p1{
          background-color: ef233c;
          
          width: 10px;
          height: 10px;
          border-radius: 50%;
         
          
      }
      .p2{
          background-color:ffb703;
          color: edede9;width: 10px;
          height: 10px;
          border-radius: 50%;
         
          
      }
      .p3{
          background-color:6a994e;
          color: edede9;width: 10px;
          height: 10px;
          border-radius: 50%;
         
          
      }
      .p4{
          background-color:8338ec;
          color: edede9;width: 10px;
          height: 10px;
          border-radius: 50%;
         
          
      }
      .p5{
          background-color:3a86ff;
          color: edede9;width: 10px;
          height: 10px;
          border-radius: 50%;
         
          
      }
      .cancle{
        width: 80%;
        margin-top: 20px;
        border-radius: 10px;
        background-color: white;
        padding-bottom: 20px;
        margin-left:auto;
        margin-right:auto;
        padding-top:1%;
    
    }
    .confirmBooking{
      width: 80%;
      margin-top: 20px;
      border-radius: 10px;
      background-color: white;
      padding-bottom: 20px;
      padding-top:1%;
      margin-left:auto;
      margin-right:auto;
      justify-content: space-between;            
  }
  .thanh-gach {
    border-bottom: 1px solid #dddfe2; 
    width: 90%;
    margin-left: 5%;
    display: flex;/* 1px độ rộng, loại đường viền solid, màu đen */
  }
  .detail{
  width: 80%;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
  padding-bottom: 20px;
  margin-left:auto;
  margin-right:auto;
  padding-top:1%;
  
  }
  
  .head{
  width: 100%;
  margin-top: -50%;
  border-radius: 10px;
  background-color: #27ae60;
  padding-bottom: 20px;
  margin-left:auto;
  margin-right:auto;
  z-index:1;
  
  
  
  }
  .bodycard{
  width: 80%;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
  padding-bottom: 0px;
  margin-left:auto;
  margin-right:auto;
  z-index:2;
  padding-bottom:5%;
  margin-bottom:-5%
  
  
  }
  
  
  
  
    </style>
  </head>
  <body>
    <div style="width:100%;font-family:helvetica,'helvetica neue',arial,verdana,sans-serif;padding:0;Margin:0;background-color:#e5e5e5;margin:0;color:#2a2a2e;box-sizing:border-box;paddingtop:1.2%">
    <p style="text-align: center;font-weight: bolder; margin-top: 10ch;margin-left:auto;margin-right:auto;font-weight:bolder;">HELLA</p>
    <p class="p1" style="   background-color:3a86ff;"> </p>
  
    <div class=card>
  
    <div class="bodycard">
    <div class="head" style="margin-bottom:-2%"></div>
    <div style="display: flex; align-items: center;">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYvLq6x55RtPhRk2MA2057rRlxaRveIXvzug&usqp=CAU" width="2.5%" height="2.5%" style="border-radius: 50%;margin-left:50%;margin-right:50%">
  </div>
  <h4 style="text-align:center;color: #27ae60" > Thanks for booking!</h4>
  <p style="text-align:center;">${data.userInfor.fullName ?? 'unknown'}</p>
  <p style="text-align:center;">For reference, your reservation number is 1066371804. To view, cancel, or modify your reservation, use our easy self-service options.</p>
  <div style="justify-content: center; align-items: center;margin-left:40%">
  <button style="background-color: #3a86ff;
            color: white;
            border-radius: 5px;
            border: 2px solid #3a86ff;
            width: 40%;
            height: 30px;
            font-style: oblique;">
  YOUR RESERVATION
  </button>
  </div>
  
    </div>
   
    
    
    </div>  
    
           
  
    <div class =detail>
    <h3 style="margin-left: 5%;">Your Tour</h3>
    <div style="margin-left: 5%;display: flex; gap:30%">
    <img src=${
      data.tripInfor.tour.image ?? 'https://statics.vinpearl.com/du-lich-vinh-Ha-Long-hinh-anh1_1625911963.jpg'
    } alt="Girl in a jacket" width="30%" height="10%">
    <div style="margin-left:30%">
    <h1 >${data.tripInfor.tour.tourName}</h1>
    <p>Show direction</p>
    </div>
    </div>
    <div class="thanh-gach" style="margin-top:2.5%"></div>
    <div style="text-align: center;">
    <table style="margin: 0 auto; width: 100%;">
                    <tr>
                        <th>
                            Start Date
  
                        </th>
                       
                        <th>
                            End Date
                            
                        </th>
  
                    </tr>
                    <tr>
                        <td style="padding:0;Margin:0;padding-right:24px;border-right:1px solid #dddfe2;width:50%;vertical-align:top">
                            ${data.tripInfor.startDate}
                            <p>(After 2:00 PM)</p>
  
                        </td>
                        <td style="padding-left: 24px;">
                        ${data.tripInfor.endDate}
                          <p>  (Before 12:00 AM)</p>
  
                        </td>
                    </tr>
                </table>
    </div>
    <div class="thanh-gach" style="margin-top:1%" ></div>
    <p style="margin-left: 5%;text-align:center;">You can also easily learn about the property's policies and amenities in My Booking Form
  
    For any questions regarding the property, please contact the property directly.</p>
  
    <div  style="  width: 50%;
    background-color:#7BD3EA ;margin-left: 25%;text-align: center; border-radius:  5px;">
        <p> Butler email</p>
        <p>HellaBooking@gmail.com</p>
  
    </div>
    <h3 style="margin-left: 5%;">Importan information</h3>
    <p  style="margin-left: 5%;">This property does not accept bachelorette parties or similar parties. Managed by a personal host!</p>
  
    </div>
  
  
    
    <div class =detail>
    <h3 style="margin-left: 5%;">Your Vehicle</h3>
    <div style="margin-left: 5%;display: flex; gap:30%">
    <img src=${
      data.tripInfor.tour.vehicleType?.image ?? "https://vtv1.mediacdn.vn/zoom/640_400/2022/3/13/anh-chup-man-hinh-2022-03-13-luc-165256-16471651872591300529708.png"
    } alt="Girl in a jacket" width="30%" height="10%">
    <div style="margin-left:30%">
    <h1 >${data.tripInfor.tour.vehicleType.vehicleName}</h1>
  
    </div>
    </div>
    <div class="thanh-gach" style="margin-top:2.5%"></div>
    <div style="text-align: center;">
    <table style="margin: 0 auto; width: 100%;">
                    <tr>
                        <th>
                            Rent start
  
                        </th>
                       
                        <th>
                          Rent return
                            
                        </th>
  
                    </tr>
                    <tr>
                        <td style="padding:0;Margin:0;padding-right:24px;border-right:1px solid #dddfe2;width:50%;vertical-align:top">
                            ${data.tripInfor.startDate}
                           
  
                        </td>
                        <td style="padding-left: 24px;">
                        ${data.tripInfor.endDate}
                      
  
                        </td>
                    </tr>
                </table>
    </div>
    <div class="thanh-gach" style="margin-top:1%" ></div>
    <p style="margin-left: 5%;text-align:center;">You can also easily learn about the property's policies and amenities in My Booking Form
  
    For any questions regarding the property, please contact the property directly.</p>
  
    <div  style="  width: 50%;
    background-color:#7BD3EA ;margin-left: 25%;text-align: center; border-radius:  5px;">
        <p> Butler email</p>
        <p>HellaBooking@gmail.com</p>
  
    </div>
    <h3 style="margin-left: 5%;">Importan information</h3>
    <p  style="margin-left: 5%;">This property does not accept bachelorette parties or similar parties. Managed by a personal host!</p>
  
    </div>
  
    <div class="detail">
     <div >
     <h3 style="margin-left: 5%;">Your Booking</h3>
     </div>
  
     <div style="margin-left: 5%;display:flex;flex-direction:column; border-bottom: 1px solid #dddfe2; ;margin-right:5%;margin-bottom:2%">
      <div style="width:30%">
          Tour
      </div>  
      <div style="width:70%">
      ${data.tripInfor.tour.tourName}
      </div>  
      </div>
      
  
      <div style="margin-left: 5%;display:flex;flex-direction:column; border-bottom: 1px solid #dddfe2; ;margin-right:5%;margin-bottom:2%">
      <div style="width:30%">
          Vehicle
      </div>  
      <div style="width:70%">
         ${data.tripInfor.tour.vehicleType.vehicleName}
      </div>  
      </div>
  
      
      <div style="margin-left: 5%;display:flex;flex-direction:column; border-bottom: 1px solid #dddfe2; ;margin-right:5%;margin-bottom:2%">
      <div style="width:30%">
          Guests
      </div>  
      <div style="width:70%">
      ${data.tripInfor.totalCustomer} people
      </div>  
      </div>
  
      <div style="margin-left: 5%;display:flex;flex-direction:column; border-bottom: 1px solid #dddfe2; ;margin-right:5%;margin-bottom:2%">
      <div style="width:30%">
        Main  Guests
      </div>  
      <div style="width:70%">
      ${data.userInfor.fullName ?? "unknown"} 
      </div>  
      </div>
  
      <div style="margin-left: 5%;display:flex;flex-direction:column; border-bottom: 1px solid #dddfe2; ;margin-right:5%;margin-bottom:2%">
      <div style="width:30%">
       Extra Guests
      </div>  
      <div style="width:70%">
      ${data.userInfor.fullName ?? "unknown"} 
      </div>  
      </div>
  
      <div style="margin-left: 5%;display:flex;flex-direction:column; border-bottom: 1px solid #dddfe2; ;margin-right:5%;margin-bottom:2%">
      <div style="width:30%">
      Special requirement
      </div>  
      <div style="width:70%">
      I'd like a non-smoking room
      </div>  
      </div>
    
    
    
    
    </div>
        
        
  
  
  
  
        <div class="confirmBooking">
        <h3 style="margin-left: 5%;">Your reservation has been confirmed</h3>
         <div style="display: flex; justify-content: space-between; align-items: center; margin-left:5%;margin-right:5%;  justify-content: space-between;">
         <p style="margin-right: auto;">Tour </p>
  
         <p style="margin-left: auto;">${data.tripInfor.tour.price} VND </p>
         
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-left:5%;margin-right:5%;  justify-content: space-between;">
         <p style="margin-right: auto;">Total customer </p>
  
         <p style="margin-left: auto;">${
          data.tripInfor.totalCustomer
         }</p>
         
        </div>
        <div class="thanh-gach"></div>
        <div style="display: flex; justify-content: flex-start; align-items: center; margin-left: 5%; margin-right: 5%; font-weight: bolder;">
        <p style="margin-right: auto;">Total</p>
        <p style="margin-left: auto;">${data.tripInfor.totalCustomer*data.tripInfor.tour.price}VND 
        </p>
      </div>
         <p style="margin-left: 5%;font-weight: lighter;font-size: x-small;">Includes: Taxes and fees ${data.tripInfor.totalCustomer*data.tripInfor.tour.price} VND </p>  
         <p  style="margin-left: 5%;font-weight: lighter;font-size: x-small;">You will be charged ${data.tripInfor.totalCustomer*data.tripInfor.tour.price} VND for the accommodation according to the cancellation policy.</p>
  
  
    </div>
  
  
        <div class="cancle">
        <h3 style="margin-left: 5%;">Cancelation Policy</h3>
        <div style="margin-left: 5%; border-left: 10px solid #ef233c; padding-left: 40px;;">
          
           <p style="font-weight: bold;">No refunds</p>
         
          
           <p>${data?.hotel?.timecancle ?? ''}</p></div>
            
  
         
         <h5 style="margin-left: 5%;">Important Information</h5>
         <p style="margin-left: 5%;">This booking is non-refundable and cannot be changed or modified.
            Failure to arrive at the hotel or property will be treated as a No Show and a charge of 100% of the booking value will be charged (Hotel Regulations).</p>
  
  
    </div>
    
      
        
  
  
  
    </div>
   
  
    
  
    
  </body>
  </html>
  
  `;
    console.log(data);
    return checkOutEmail;
  };
  

  