import { PropertyCard } from '../property-card'
import { Property } from '@shared/schema'
import apartmentImg from '@assets/generated_images/luxury_apartment_building_exterior_e11af77f.png'
import officeImg from '@assets/generated_images/commercial_office_building_f8c8d53a.png'

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Apartment Complex',
    description: 'Modern residential complex in the heart of Riyadh with premium amenities and excellent rental yield potential.',
    location: 'Olaya District, Riyadh',
    price: '2500000',
    propertyType: 'residential',
    yield: '8.5',
    ownershipCap: 75,
    status: 'live',
    images: [apartmentImg],
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Commercial Office Tower',
    description: 'Prime commercial space in the business district with high-end office facilities and parking.',
    location: 'King Fahd District, Riyadh',
    price: '8750000',
    propertyType: 'commercial',
    yield: '12.2',
    ownershipCap: 60,
    status: 'upcoming',
    images: [officeImg],
    createdAt: new Date(),
  }
]

export default function PropertyCardExample() {
  const handleEdit = (id: string) => {
    console.log('Edit property:', id)
  }

  const handleDelete = (id: string) => {
    console.log('Delete property:', id)
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockProperties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}