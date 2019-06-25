import Point from './point';
import Drawable from './drawable';
import ShapeRenderer from '../lib/shapeRenderer';

const DEFAULT_RADIUS = 10;

class Circle extends Drawable {
	constructor( center, radius, strokeColor, strokeSize ) {
		super( strokeColor, strokeSize );

		this._center = center;
		this._radius = radius;
	}

	static fromJSON( properties ) {
		return new Circle(
			new Point( {
				x: properties.center.x,
				y: properties.center.y
			} ),
			properties.radius,
			properties.stroke_color,
			properties.stroke_size
		);
	}

	toJSON() {
		return {
			type: 'circle',
			center: {
				x: this.center.get( 'x' ),
				y: this.center.get( 'y' )
			},
			radius: this.radius,
			stroke_color: this.strokeColor,
			stroke_size: this.strokeSize
		};
	}

	get center() { return this._center; }
	get radius() { return this._radius; }
	get renderer() { return ShapeRenderer.forCircle( this ); }
	get referencePoint() { return this.center; }
	get isValid() { return this.radius > 0; }

	static fromPoint( point, strokeColor, strokeSize ) {
		const radius = DEFAULT_RADIUS;
		const center = new Point( {
			x: point.get( 'x' ) - radius,
			y: point.get( 'y' ) - radius
		} );

		return new Circle( center, radius, strokeColor, strokeSize );
	}

	updateWith( point ) {
		const xDelta = Math.abs( this.center.get( 'x' ) - point.get( 'x' ) );
		const yDelta = Math.abs( this.center.get( 'y' ) - point.get( 'y' ) );

		const radius = Math.sqrt( ( xDelta ** 2 ) + ( yDelta ** 2 ) );

		return new Circle( this.center, radius, this.strokeColor, this.strokeSize );
	}
}

export default Circle;
