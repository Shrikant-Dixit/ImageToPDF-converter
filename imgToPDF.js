const selectImg = document.getElementById("selectImg");
const selectPDF = document.getElementById("selectPDF");
const pdfConvert = document.getElementById("pdfConvert");
const fileList = document.getElementById("fileList");
const preview = document.getElementById("preview");
const cropBtn = document.getElementById("cropBtn");
const rotateBtn = document.getElementById("rotateBtn");
const margin = document.getElementById("margin");
const filter = document.getElementById("filter");
const resetBtn = document.getElementById("resetBtn");

let selectedImages =[];
let activeImageIndex = null;
let cropper;

selectImg.addEventListener("change", function() {
    selectedImages = selectedImages.concat(Array.from(selectImg.files));
   
    fileList.innerHTML = " ";
    selectedImages.forEach(function(file) {
       let image = document.createElement("li");
       image.textContent = file.name;
       fileList.appendChild(image); 

        preview.innerHTML = "";
    selectedImages.forEach(function(file,index) {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "240px";
        img.style.height = "280px";
        img.style.marginRight = "40px";
        img.style.marginLeft = "40px"
        img.style.marginTop = "50px";
        preview.appendChild(img);

        img.addEventListener("click", () => {
            document.querySelectorAll("#preview img").forEach(el => el.classList.remove("selected"));
            img.classList.add("selected");
            activeImageIndex = index;

            if(cropper) {
           cropper.destroy();
           cropper = null;
          }

        cropper = new Cropper(img , {
            aspectRatio: NaN,
            viewMode: 1,
            autoCropArea: 1.0,
            responsive:true

        });
        });

        preview.appendChild(img);

    })

    
    })

})

selectPDF.addEventListener("change", function() {
    pdfFile = selectPDF.files[0];

    if(pdfFile) {
        console.log("Selected PDF:",pdfFile);
    }
})


rotateBtn.addEventListener("click",function() {
    if(cropper) {
        cropper.rotate(90);
        // cropper.rotate(90);
        // cropper.rotate(90);
        // cropper.rotate(90);
        
        const rotatedCanvas = cropper.getCroppedCanvas({
            width:240,
            height:280,
            fillColor:"white"
         });

        const rotatedImg = document.createElement("img");
        rotatedImg.src = rotatedCanvas.toDataURL("image/png");
        rotatedImg.style.width = "240px";
        rotatedImg.style.height = "280px";

        const oldImg = document.querySelector(`#preview img.selected`);
        preview.replaceChild(rotatedImg,oldImg);

        cropper.destroy();
        cropper = null;
    }
    
})

margin.addEventListener("click",function() {

    document.querySelectorAll("#preview img").forEach(function(img) {
 
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const marginSize = 20;
        canvas.width = 240 + marginSize*2;
        canvas.height = 280 + marginSize*2;

        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.drawImage(img,marginSize,marginSize,240,280);

        const newImg = document.createElement("img");
        newImg.src = canvas.toDataURL("image/png");
        newImg.style.width = img.style.width;
        newImg.style.height = img.style.height;

        preview.replaceChild(newImg,img);

    })
    

})

filter.addEventListener("click", function() {
    document.querySelectorAll("#preview img").forEach(function(img) {
        img.style.filter = "grayscale(100%)";

        const newImg = document.createElement("img");
        preview.replaceChild(newImg,img);
    })
})


resetBtn.addEventListener("click", function() {

    selectedImages = [];
    selectedImages = selectedImages.concat(Array.from(selectImg.files));
   
    fileList.innerHTML = " ";
    selectedImages.forEach(function(file) {
       let image = document.createElement("li");
       image.textContent = file.name;
       fileList.appendChild(image); 

        preview.innerHTML = "";
    selectedImages.forEach(function(file,index) {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "240px";
        img.style.height = "280px";
        img.style.marginRight = "40px";
        img.style.marginLeft = "40px"
        img.style.marginTop = "50px";
        preview.appendChild(img);

        img.addEventListener("click", () => {
            document.querySelectorAll("#preview img").forEach(el => el.classList.remove("selected"));
            img.classList.add("selected");
            activeImageIndex = index;

            if(cropper) {
           cropper.destroy();
           cropper = null;
          }

        cropper = new Cropper(img , {
            aspectRatio: NaN,
            viewMode: 1,
            autoCropArea: 1.0,
            responsive:true

        });
        });

        preview.appendChild(img);

    })
    if(cropper) {
        cropper.destroy;
        cropper = null;
}

    
    })

})

cropBtn.addEventListener("click", function() {
  if (cropper) {
   
    const croppedCanvas = cropper.getCroppedCanvas({
      width: 240,
      height: 280,
      fillColor: "white" 
    });

    
    const croppedImg = document.createElement("img");
    croppedImg.src = croppedCanvas.toDataURL("image/png");
    croppedImg.style.width = "240px";
    croppedImg.style.height = "280px";

    // BEST PART BY AI
    const oldImg = document.querySelector("#preview img.selected");
    if (oldImg) {
      preview.replaceChild(croppedImg, oldImg);
    }
    
    cropper.destroy();
    cropper = null;
  }
});

pdfConvert.addEventListener("click", function() {

    const {jsPDF} = window.jspdf;
    const pdf = new jsPDF();

    const finalImages = document.querySelectorAll("#preview img");

    finalImages.forEach( function(img,index) {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        

        canvas.width = 1000;
        canvas.height = 800;

        ctx.drawImage(img,0,0,730 ,780 );

        const imgData = canvas.toDataURL("image/jpeg",0.8);

        pdf.addImage(imgData,"JPEG",10,10,260,300);

        if(index < finalImages.length - 1) {
            pdf.addPage();
        }
    });
    pdf.save("converted-images.pdf");

});

