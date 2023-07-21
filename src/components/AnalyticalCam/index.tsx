import React, { useRef } from 'react';

import Cam from '../../assets/image/icons/photo-camera.svg';

import * as S from './styles';

export default function AnalyticalCam() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  const sendToCloudVision = async (imagem: File) => {
    const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_VISION_API_KEY;
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const formData = new FormData();
    formData.append('file', imagem);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar a imagem para o Google Cloud Vision.');
      }

      const data = await response.json();

      // Aqui você pode tratar a resposta do Google Cloud Vision
      console.log(data);
    } catch (error) {
      // Trate erros de requisição, caso ocorram
      console.error(error);
    }
  };

  const handleCaptureImage = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
      // Define a stream do vídeo para exibir a visualização da câmera
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((error) => {
        console.error('Erro ao acessar a câmera:', error);
      });

    // Captura a imagem da câmera e converte para um blob (imagem em formato binário)
    const blob = await new Promise<Blob | null>((resolve) => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');

        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blobs) => {
          resolve(blobs);
        }, 'image/jpeg', 0.95);
      }
    });

    if (!blob) return;
    console.log('Imagem capturada:', blob);

    // Crie um novo objeto do tipo File, adicionando os campos necessários
    const file = new File([blob], 'nome-do-arquivo.jpg', {
      lastModified: new Date().getTime(), // Use o timestamp atual para a data de modificação
      type: 'image/jpeg', // Defina o tipo do arquivo (neste caso, 'image/jpeg')
    });

    sendToCloudVision(file); // Envia o objeto do tipo File para a função sendToCloudVision
  };

  return (
    <S.Container>
      <video ref={videoRef} width="300" height="480">
        <track label="Legendas" kind="captions" src="src/image/legendas.vtt" default />
      </video>

      <canvas />

      <button type="button" onClick={handleCaptureImage}>
        <img src={Cam} alt="Camera" />
      </button>

    </S.Container>
  );
}
