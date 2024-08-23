import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button, Navbar, Nav } from 'react-bootstrap';

function BookForm({ onSubmit, defaultValues = {} }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  });

  return (
    <Container>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Book Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#add">Add Book</Nav.Link>
            <Nav.Link href="#update">Update Book</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Form */}
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h2>{defaultValues.id ? 'Update Book' : 'Add Book'}</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                {...register('title', { required: 'Title is required' })}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="author" className="mt-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                {...register('author', { required: 'Author is required' })}
                isInvalid={!!errors.author}
              />
              <Form.Control.Feedback type="invalid">
                {errors.author?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="publishedYear" className="mt-3">
              <Form.Label>Published Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter published year"
                {...register('publishedYear', { 
                  required: 'Published year is required',
                  min: { value: 1000, message: 'Invalid year' },
                  max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
                })}
                isInvalid={!!errors.publishedYear}
              />
              <Form.Control.Feedback type="invalid">
                {errors.publishedYear?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter book description"
                rows={3}
                {...register('description')}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              {defaultValues.id ? 'Update Book' : 'Add Book'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BookForm;
