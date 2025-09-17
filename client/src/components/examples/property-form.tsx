import { PropertyForm } from '../property-form'

export default function PropertyFormExample() {
  const handleSubmit = (data: any) => {
    console.log('Form submitted with data:', data)
  }

  const handleCancel = () => {
    console.log('Form cancelled')
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Property Form</h3>
      <PropertyForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  )
}