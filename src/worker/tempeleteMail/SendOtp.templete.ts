export const sendOtp =(data:any)=>{
    const otp = 
    `
    <html>
    <head>
      <style>
       /* Import the Open Sans font for a clean and modern look */
  @import url("https://fonts.googleapis.com/css?family=Open+Sans");
  
  /* Global styles for a consistent base */
  * {
    box-sizing: border-box;
    font-family: "Open Sans", Arial, sans-serif; /* Fallback fonts for better accessibility */
    margin: 0; /* Remove default margins for cleaner layout */
  }
  
  /* Body styles for a centered and visually appealing email container */
  body {
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Set full viewport height for a seamless email view */
  }
  
  /* Email container styles with rounded corners and a subtle shadow */
  .c-email {
    width: 90vw; /* Adjusted width for smaller screens */
    max-width: 400px; /* Maximum width for larger screens */
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);
  }
  
  /* Header styles with a vibrant green background and clear title */
  .c-email__header {
    background-color: #0fd59f;
    width: 100%;
    height: 60px;
    padding: 0 20px; /* Add horizontal padding for improved readability */
  }
  
  .c-email__header__title {
    font-size: 23px;
    color: white;
    text-align: center;
    line-height: 60px; /* Align title vertically within the header */
  }
  
  /* Content styles with clear hierarchy and ample spacing */
  .c-email__content {
    width: 100%;
    min-height: 300px; /* Ensure minimum height for consistent layout */
    display: flex;
    flex-direction: column; /* Apply column layout */
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 15px;
  }
  
  .c-email__content__text {
    font-size: 20px;
    color: #343434;
    text-align: center;
    margin: 0; /* Reset default margins for consistent spacing */
  }
  
  /* Code block styles with a prominent display, rounded corners, and a distinct background */
  .c-email__code {
    display: block;
    width: 100%; /* Adjusted width for smaller screens */
    margin: 30px auto;
    background-color: #ddd;
    border-radius: 40px;
    padding: 20px;
    text-align: center;
    font-size: 28px; /* Adjusted font size for smaller screens */
    letter-spacing: 8px; /* Adjusted letter spacing for smaller screens */
    box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);
  }
  
  /* Footer styles (can be customized for additional content or branding elements) */
  .c-email__footer {
    width: 100%;
    height: 60px;
    background-color: #fff;
  }
  
  /* Utility classes for common styling needs (optional) */
  .text-center {
    text-align: center;
  }
  
  .text-italic {
    font-style: italic;
  }
  
  .opacity-30 {
    opacity: 0.3;
  }
  
  .mb-0 {
    margin-bottom: 0;
  }
  
  /* Media query for screens smaller than 300px */
  @media (max-width: 300px) {
    .c-email {
      width: 90vw; /* Adjusted width for smaller screens */
      max-width: none; /* Remove maximum width for smaller screens */
    }
  
    .c-email__code {
      font-size: 24px; /* Further adjusted font size for very small screens */
      letter-spacing: 6px; /* Further adjusted letter spacing for very small screens */
    }
    .c-email__content{
      display: flex;
      flex-direction: column;
    }
  }
  
        </style>
    </head>
    <body>
      <div class="c-email">
        <div class="c-email__header">
          <h1 class="c-email__header__title">Your Verification Code</h1>
        </div>
        <div>
          <div class="c-email__content">
               <div>
                  <p class="c-email__content__text text-title">
                      Enter this verification code in field:
                    </p>
               </div>
              <div class="c-email__code">
                <span class="c-email__code__text">${data.otp}</span>
              </div>
            <div>
              <p
              class="c-email__content__text text-italic opacity-30 text-title mb-0"
            >
              Verification code is valid only for 5 minutes
            </p>
            </div>
            </div>
        </div>
        <div class="c-email__footer"></div>
      </div>
    </body>
  </html>
  
  
  `
  return otp
}