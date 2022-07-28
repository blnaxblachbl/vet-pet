import { gql } from "@apollo/client"

export const FIND_MANY_ADMIN_COUNT = gql`
	query(
		$where: AdminWhereInput
		$orderBy: [AdminOrderByWithRelationInput]
		$cursor: AdminWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AdminScalarFieldEnum]
	){
		findManyAdminCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_USER_COUNT = gql`
	query(
		$where: UserWhereInput
		$orderBy: [UserOrderByWithRelationInput]
		$cursor: UserWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [UserScalarFieldEnum]
	){
		findManyUserCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_ORGANIZATION_COUNT = gql`
	query(
		$where: OrganizationWhereInput
		$orderBy: [OrganizationOrderByWithRelationInput]
		$cursor: OrganizationWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [OrganizationScalarFieldEnum]
	){
		findManyOrganizationCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_SCHEDULE_COUNT = gql`
	query(
		$where: ScheduleWhereInput
		$orderBy: [ScheduleOrderByWithRelationInput]
		$cursor: ScheduleWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ScheduleScalarFieldEnum]
	){
		findManyScheduleCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_GOOD_COUNT = gql`
	query(
		$where: GoodWhereInput
		$orderBy: [GoodOrderByWithRelationInput]
		$cursor: GoodWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [GoodScalarFieldEnum]
	){
		findManyGoodCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_STOCK_COUNT = gql`
	query(
		$where: StockWhereInput
		$orderBy: [StockOrderByWithRelationInput]
		$cursor: StockWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [StockScalarFieldEnum]
	){
		findManyStockCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_CART_COUNT = gql`
	query(
		$where: CartWhereInput
		$orderBy: [CartOrderByWithRelationInput]
		$cursor: CartWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [CartScalarFieldEnum]
	){
		findManyCartCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_ORDER_COUNT = gql`
	query(
		$where: OrderWhereInput
		$orderBy: [OrderOrderByWithRelationInput]
		$cursor: OrderWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [OrderScalarFieldEnum]
	){
		findManyOrderCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_PET_COUNT = gql`
	query(
		$where: PetWhereInput
		$orderBy: [PetOrderByWithRelationInput]
		$cursor: PetWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [PetScalarFieldEnum]
	){
		findManyPetCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_AD_COUNT = gql`
	query(
		$where: AdWhereInput
		$orderBy: [AdOrderByWithRelationInput]
		$cursor: AdWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AdScalarFieldEnum]
	){
		findManyAdCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`