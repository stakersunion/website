import { useUpdateRole } from '@/utils/query/admin/users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const UpdateRole = ({ id, role, icon }) => {
  const { mutate: updateRole, isPending } = useUpdateRole()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateRole({ id: id, role: role })
  }

  if (isPending) {
    return (
      <DropdownMenuItem disabled>
        <FontAwesomeIcon
          icon={faLoader}
          className={'mr-2 animate-spin'}
        />
        Updating...
      </DropdownMenuItem>
    )
  } else {
    return (
      <DropdownMenuItem onClick={handleSubmit}>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={'mr-2'}
          />
        )}
        Make {role}
      </DropdownMenuItem>
    )
  }
}
export default UpdateRole
