import { Header } from 'src/components/Header';
import { ModalCreate } from 'src/components/modals/ModalCreate';
import { ModalDelete } from 'src/components/modals/DeleteModal';
import { Table } from 'src/components/Table';
import { EditCompanyModal } from 'src/components/modals/ModalEdit';
import { useCallback, useState } from 'react';
import'./styles/index.scss';
import { DEFAULT_VALUE_COMPANY } from './constants/edit';
import { TCompanyServer } from 'src/types/companies';

function App() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<TCompanyServer>(DEFAULT_VALUE_COMPANY);

  const handleEditClick = useCallback((company: TCompanyServer) => {
    setSelectedCompany(company);
    setEditModalOpen(true);
  }, []);

  const handleCloseEditModal = () => {
    setSelectedCompany(DEFAULT_VALUE_COMPANY);
    setEditModalOpen(false);
  };

  return (
    <div className="app">
      <Header/>
      <Table onEditClick={handleEditClick} />
      <ModalCreate />
      <ModalDelete />
      <EditCompanyModal
        isOpened={isEditModalOpen}
        selectedCompany={selectedCompany}
        onClose={handleCloseEditModal}
      />
    </div>
  );
}

export default App;
