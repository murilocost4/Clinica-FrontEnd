import React, { useState } from 'react';

const ModalAnamnese = ({ show, onClose, onConfirm, paciente }) => {
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [allergies, setAllergies] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [attachmentPreview, setAttachmentPreview] = useState('');

  if (!show) return null;

  const handleFileChange = (event) => {
    const files = event.target.files;
    setAttachments([...attachments, ...files]);
    setAttachmentPreview(URL.createObjectURL(files[0])); // Exibir uma prévia do primeiro arquivo
  };

  const handleConfirm = () => {
    const anamneseData = {
      symptoms,
      medicalHistory,
      allergies,
      attachments: attachments.map((file) => file.name), // Aqui você pode armazenar o caminho ou a URL do arquivo conforme necessário
    };

    paciente.anamnese = anamneseData; // Armazenar a anamnese no paciente

    onConfirm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm shadow-2xl backdrop-brightness-90 z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold">Anamnese do Paciente</h2>
        <p>Paciente: {paciente.nome}</p>

        <div className="mt-4">
          <label className="block text-gray-700">Sintomas</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="mt-2 p-2 w-full h-32 border border-gray-300 rounded-lg"
            placeholder="Descreva os sintomas..."
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Histórico Médico</label>
          <textarea
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            className="mt-2 p-2 w-full h-32 border border-gray-300 rounded-lg"
            placeholder="Informe o histórico médico..."
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Alergias</label>
          <textarea
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="mt-2 p-2 w-full h-32 border border-gray-300 rounded-lg"
            placeholder="Informe as alergias..."
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Anexos</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
          />
          {attachmentPreview && (
            <div className="mt-2">
              <h3 className="text-sm text-gray-700">Prévia do arquivo:</h3>
              <img src={attachmentPreview} alt="Prévia do anexo" className="mt-2 w-full h-32 object-cover rounded-md" />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Concluir Anamnese
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAnamnese;
