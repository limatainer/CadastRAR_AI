import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface UserData {
  title: string;
  image: string;
  body: string;
  tags: string[];
  createdBy: string;
  createdAt?: { seconds: number };
}

// Helper function to create a temporary HTML element and capture it
const createAndCaptureElement = async (
  htmlContent: string,
  width: number,
  height: number
): Promise<string> => {
  // Create temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  container.innerHTML = htmlContent;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      width,
      height,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    return imgData;
  } finally {
    document.body.removeChild(container);
  }
};

export const generateIDCard = async (userData: UserData): Promise<void> => {
  const date = userData.createdAt
    ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString()
    : 'N/A';

  // ID Card dimensions: 85.6mm x 53.98mm = ~323px x 204px at 96 DPI
  const width = 680;
  const height = 430;

  const htmlContent = `
    <div style="
      width: ${width}px;
      height: ${height}px;
      background: white;
      font-family: system-ui, -apple-system, sans-serif;
      position: relative;
      overflow: hidden;
    ">
      <!-- Purple Header -->
      <div style="
        background: rgb(124, 58, 237);
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 42px;
        font-weight: bold;
      ">
        CadastRAR
      </div>

      <!-- Content Area -->
      <div style="
        display: flex;
        padding: 30px;
        gap: 25px;
        align-items: center;
      ">
        <!-- Profile Image -->
        <img
          src="${userData.image}"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(userData.title)}&background=8b5cf6&color=fff&size=256'"
          style="
            width: 120px;
            height: 120px;
            border-radius: 60px;
            object-fit: cover;
            border: 4px solid rgb(124, 58, 237);
            flex-shrink: 0;
          "
        />

        <!-- User Info -->
        <div style="flex: 1;">
          <h2 style="
            margin: 0 0 10px 0;
            font-size: 32px;
            color: #1f2937;
            font-weight: bold;
          ">${userData.title}</h2>

          <p style="
            margin: 0 0 8px 0;
            font-size: 18px;
            color: #6b7280;
          ">
            ${userData.tags.slice(0, 3).map(tag => `#${tag}`).join(' ')}
          </p>

          <p style="
            margin: 0;
            font-size: 16px;
            color: #9ca3af;
          ">
            Registered: ${date}
          </p>
        </div>
      </div>
    </div>
  `;

  const imgData = await createAndCaptureElement(htmlContent, width, height);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85.6, 53.98]
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, 85.6, 53.98);
  pdf.save(`${userData.title}-ID-Card.pdf`);
};

export const generateCertificate = async (userData: UserData): Promise<void> => {
  const date = userData.createdAt
    ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  // A4 Landscape: 297mm x 210mm = ~1122px x 794px at 96 DPI
  const width = 1400;
  const height = 990;

  const htmlContent = `
    <div style="
      width: ${width}px;
      height: ${height}px;
      background: white;
      font-family: 'Georgia', serif;
      position: relative;
      overflow: hidden;
    ">
      <!-- Purple Header -->
      <div style="
        background: rgb(124, 58, 237);
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 48px;
        font-weight: bold;
        letter-spacing: 3px;
      ">
        CERTIFICATE OF REGISTRATION
      </div>

      <!-- Content Area with Gray Background -->
      <div style="
        background: rgb(240, 240, 240);
        margin: 40px 80px;
        padding: 60px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        position: relative;
      ">
        <!-- Profile Image -->
        <img
          src="${userData.image}"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(userData.title)}&background=8b5cf6&color=fff&size=256'"
          style="
            width: 150px;
            height: 150px;
            border-radius: 75px;
            object-fit: cover;
            border: 6px solid rgb(124, 58, 237);
            margin-bottom: 30px;
          "
        />

        <p style="
          font-size: 32px;
          color: #374151;
          margin: 0 0 20px 0;
          font-style: italic;
        ">
          This certifies that
        </p>

        <h1 style="
          font-size: 56px;
          color: #1f2937;
          margin: 0 0 30px 0;
          font-weight: bold;
        ">${userData.title}</h1>

        <p style="
          font-size: 26px;
          color: #4b5563;
          margin: 0 0 25px 0;
        ">
          has been successfully registered in the CadastRAR system
        </p>

        ${userData.tags.length > 0 ? `
          <p style="
            font-size: 22px;
            color: #6b7280;
            margin: 0 0 30px 0;
          ">
            <strong>Specializations:</strong> ${userData.tags.join(', ')}
          </p>
        ` : ''}

        <p style="
          font-size: 18px;
          color: #6b7280;
          margin: 0 0 35px 0;
          line-height: 1.6;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        ">
          ${userData.body}
        </p>

        <div style="
          border-top: 2px solid rgb(124, 58, 237);
          padding-top: 30px;
          margin-top: 40px;
        ">
          <p style="
            font-size: 20px;
            color: #4b5563;
            margin: 0 0 15px 0;
          ">
            <strong>Date:</strong> ${date}
          </p>

          <p style="
            font-size: 16px;
            color: #9ca3af;
            margin: 0;
          ">
            Generated by CadastRAR
          </p>
        </div>
      </div>
    </div>
  `;

  const imgData = await createAndCaptureElement(htmlContent, width, height);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
  pdf.save(`${userData.title}-Certificate.pdf`);
};

export const generateProfileSheet = async (userData: UserData): Promise<void> => {
  const date = userData.createdAt
    ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  // A4 Portrait: 210mm x 297mm = ~794px x 1122px at 96 DPI
  const width = 1000;
  const height = 1414;

  const htmlContent = `
    <div style="
      width: ${width}px;
      height: ${height}px;
      background: white;
      font-family: system-ui, -apple-system, sans-serif;
      position: relative;
      overflow: hidden;
    ">
      <!-- Purple Header -->
      <div style="
        background: rgb(124, 58, 237);
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 40px;
        font-weight: bold;
      ">
        User Profile
      </div>

      <!-- Content Container -->
      <div style="padding: 50px 60px;">
        <!-- Profile Header with Image -->
        <div style="
          display: flex;
          gap: 30px;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 3px solid rgb(124, 58, 237);
        ">
          <img
            src="${userData.image}"
            onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(userData.title)}&background=8b5cf6&color=fff&size=256'"
            style="
              width: 150px;
              height: 150px;
              border-radius: 75px;
              object-fit: cover;
              border: 5px solid rgb(124, 58, 237);
              flex-shrink: 0;
            "
          />

          <div>
            <h1 style="
              margin: 0 0 10px 0;
              font-size: 42px;
              color: #1f2937;
              font-weight: bold;
            ">${userData.title}</h1>

            <p style="
              margin: 0;
              font-size: 20px;
              color: #6b7280;
            ">
              ${userData.tags.map(tag => `#${tag}`).join(' ')}
            </p>
          </div>
        </div>

        <!-- Description Section -->
        <div style="margin-bottom: 35px;">
          <h2 style="
            margin: 0 0 15px 0;
            font-size: 28px;
            color: #1f2937;
            font-weight: bold;
          ">Description</h2>

          <p style="
            margin: 0;
            font-size: 20px;
            color: #4b5563;
            line-height: 1.7;
            background: rgb(249, 250, 251);
            padding: 25px;
            border-radius: 8px;
            border-left: 4px solid rgb(124, 58, 237);
          ">
            ${userData.body}
          </p>
        </div>

        <!-- Tags Section -->
        <div style="margin-bottom: 35px;">
          <h2 style="
            margin: 0 0 15px 0;
            font-size: 28px;
            color: #1f2937;
            font-weight: bold;
          ">Tags</h2>

          <div style="
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          ">
            ${userData.tags.map(tag => `
              <span style="
                background: rgb(243, 232, 255);
                color: rgb(107, 33, 168);
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 18px;
                font-weight: 500;
                border: 2px solid rgb(216, 180, 254);
              ">
                #${tag}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Registration Details Section -->
        <div style="
          background: rgb(249, 250, 251);
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 35px;
        ">
          <h2 style="
            margin: 0 0 20px 0;
            font-size: 28px;
            color: #1f2937;
            font-weight: bold;
          ">Registration Details</h2>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <p style="
              margin: 0;
              font-size: 20px;
              color: #4b5563;
            ">
              <strong style="color: #1f2937;">Created by:</strong> ${userData.createdBy}
            </p>

            <p style="
              margin: 0;
              font-size: 20px;
              color: #4b5563;
            ">
              <strong style="color: #1f2937;">Registration Date:</strong> ${date}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="
        background: rgb(243, 244, 246);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(107, 114, 128);
        font-size: 16px;
      ">
        Generated by CadastRAR - User Management System
      </div>
    </div>
  `;

  const imgData = await createAndCaptureElement(htmlContent, width, height);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  pdf.save(`${userData.title}-Profile.pdf`);
};
