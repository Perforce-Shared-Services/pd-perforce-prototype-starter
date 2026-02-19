export function findChildByType<T extends React.ComponentType<object>>(
  children: React.ReactElement[],
  targetType: T
): React.ReactElement | undefined {
  return children.find((child) => {
    const childType = child?.type as React.ComponentType<object>;
    return (
      childType &&
      (childType.displayName === targetType.displayName ||
        childType === targetType)
    );
  });
}

export function filterChildrenByType<T extends React.ComponentType<object>>(
  children: React.ReactElement[],
  excludeTypes: T[]
): React.ReactElement[] {
  return children.filter(
    (child) =>
      !excludeTypes.some((type) => {
        const childType = child?.type as React.ComponentType<object>;
        return (
          childType &&
          (childType.displayName === type.displayName || childType === type)
        );
      })
  );
}
