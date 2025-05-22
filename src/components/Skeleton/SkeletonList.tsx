interface SkeletonListProps {
	count: number;
	renderItem: (index: number) => React.ReactNode;
}

const SkeletonList = ({ count, renderItem }: SkeletonListProps) => {
	return <>{Array.from({ length: count }).map((_, i) => renderItem(i))}</>;
};

export default SkeletonList;
